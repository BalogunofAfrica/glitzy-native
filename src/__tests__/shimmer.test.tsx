// @ts-nocheck
import React from 'react';
import { Text } from 'react-native';
import Animated from 'react-native-reanimated';

import LinearGradient from 'react-native-linear-gradient';
import { create } from 'react-test-renderer';

import { Shimmer } from '../shimmer';
import {
  DEFAULT_BONE_COLOR,
  DEFAULT_BORDER_RADIUS,
  DEFAULT_HIGHLIGHT_COLOR,
} from '../constants';
import { ShimmerProps } from '../types';

const staticStyles = {
  borderRadius: DEFAULT_BORDER_RADIUS,
  overflow: 'hidden',
  backgroundColor: DEFAULT_BONE_COLOR,
};

function isEmptyObject(obj) {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
}

describe('Shimmer Component test suite', () => {
  it('should render empty alone', () => {
    const tree = create(<Shimmer isLoading={false} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should have the correct layout when loading', () => {
    const layout = [
      {
        width: 240,
        height: 100,
        marginBottom: 10,
      },
      {
        width: 180,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'grey',
      },
    ];
    const props: ShimmerProps = {
      layout,
      isLoading: true,
      animationType: 'none',
    };
    const instance = create(<Shimmer {...props} />);
    const component = instance.root;
    const bones = component.findAllByType(Animated.View);

    // two bones and parent component
    expect(bones.length).toEqual(layout.length + 1);
    expect(bones[0].props.style).toEqual({
      alignItems: 'center',
      flex: 1,
      justifyContent: 'center',
    });
    // default props that are not set
    expect(bones[1].props.style.filter((node) => !isEmptyObject(node))).toEqual(
      [{ ...layout[0], ...staticStyles }],
    );
    expect(bones[2].props.style.filter((node) => !isEmptyObject(node))).toEqual(
      [{ overflow: 'hidden', ...layout[1] }],
    );
    expect(instance.toJSON()).toMatchSnapshot();
  });

  it('should have correct props and layout between loading states', () => {
    const w1 = { width: 240, height: 100, marginBottom: 10 };
    const w2 = { width: 180, height: 40 };
    const layout = [w1, w2];
    const props: ShimmerProps = {
      layout,
      isLoading: true,
      animationType: 'shiver',
    };
    const childStyle = { fontSize: 24 };
    const instance = create(
      <Shimmer {...props}>
        <Text style={childStyle} />
      </Shimmer>,
    );
    const component = instance.root;
    let bones = component.findAllByType(LinearGradient);
    // one animated view child for each bone + parent
    expect(bones.length).toEqual(layout.length);
    bones = component.findAllByType(Animated.View);
    expect(bones[1].props.style).toEqual({
      ...staticStyles,
      ...w1,
    });
    expect(bones[3].props.style).toEqual({
      ...staticStyles,
      ...w2,
    });
    let children = component.findAllByType(Text);
    // no child since it's loading
    expect(children.length).toEqual(0);

    // update props
    instance.update(
      <Shimmer {...props} isLoading={false}>
        <Text style={childStyle} />
      </Shimmer>,
    );

    bones = instance.root.findAllByType(LinearGradient);
    expect(bones.length).toEqual(0);

    children = instance.root.findAllByType(Text);
    expect(children.length).toEqual(1);
    expect(children[0].props.style).toEqual(childStyle);

    // re-update to loading state
    instance.update(
      <Shimmer {...props}>
        <Text style={childStyle} />
      </Shimmer>,
    );

    bones = instance.root.findAllByType(LinearGradient);
    expect(bones.length).toEqual(layout.length);
    bones = component.findAllByType(Animated.View);
    expect(bones[1].props.style).toEqual({
      ...staticStyles,
      ...w1,
    });
    expect(bones[3].props.style).toEqual({
      ...staticStyles,
      ...w2,
    });
    children = instance.root.findAllByType(Text);
    // no child since it's loading
    expect(children.length).toEqual(0);

    // snapshot
    expect(instance.toJSON()).toMatchSnapshot();
  });

  it('should support nested layouts', () => {
    const layout: any = [
      {
        flexDirection: 'row',
        width: 320,
        height: 300,
        children: [
          {
            width: 200,
            height: 120,
          },
          {
            width: 180,
            height: 100,
          },
        ],
      },
      {
        width: 180,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'grey',
      },
    ];
    const props: ShimmerProps = {
      layout,
      isLoading: true,
      animationType: 'shiver',
    };
    const instance = create(<Shimmer {...props} />);
    const component = instance.root;
    let bones = component.findAllByType(LinearGradient);
    // three overall bones
    expect(bones.length).toEqual(3);
    bones = component.findAllByType(Animated.View);

    expect(bones[1].props.style).toEqual({
      flexDirection: 'row',
      width: 320,
      height: 300,
    });
    // testing that styles for nested layout and last child persist
    expect(bones[2].props.style).toEqual({
      ...staticStyles,
      ...layout[0].children[0],
    });
    expect(bones[4].props.style).toEqual({
      ...staticStyles,
      ...layout[0].children[1],
    });
    expect(bones[6].props.style).toEqual({
      ...staticStyles,
      ...layout[1],
    });
    expect(instance.toJSON()).toMatchSnapshot();
  });

  it('should support percentage for child size', () => {
    const parentHeight = 300;
    const parentWidth = 320;
    const containerStyle = {
      width: parentWidth,
      height: parentHeight,
    };
    const layout = [
      {
        width: '20%',
        height: '50%',
        borderRadius: 20,
        backgroundColor: 'grey',
      },
      {
        width: '50%',
        height: '10%',
        borderRadius: 10,
      },
    ];
    const props: ShimmerProps = {
      layout,
      isLoading: true,
      animationType: 'shiver',
      containerStyle,
    };
    const instance = create(<Shimmer {...props} />);
    const component = instance.root;
    let bones = component.findAllByType(LinearGradient);

    expect(bones.length).toEqual(layout.length);
    // get parent
    bones = component.findAllByType(Animated.View);
    // testing that styles of childs corresponds to percentages
    expect(bones[1].props.style).toEqual({
      ...staticStyles,
      ...layout[0],
    });
    expect(bones[3].props.style).toEqual({
      ...staticStyles,
      ...layout[1],
    });
    expect(instance.toJSON()).toMatchSnapshot();
  });

  it('should have the correct gradient properties', () => {
    let customProps: ShimmerProps = {
      layout: [
        {
          width: 240,
          height: 100,
          marginBottom: 10,
        },
      ],
      isLoading: true,
      animationDirection: 'diagonalDownLeft',
    };
    const TestComponent = (props: ShimmerProps) => (
      <Shimmer {...props}>
        <Animated.View style={{ height: 100, width: 200 }} />
      </Shimmer>
    );
    const component = create(<TestComponent {...customProps} />);
    let gradient = component.root.findByType(LinearGradient);
    expect(gradient).toBeDefined();
    expect(gradient.props.start).toEqual({ x: 0, y: 0 });
    expect(gradient.props.end).toEqual({ x: 0, y: 1 });

    // change layout on diagonal component
    customProps = {
      ...customProps,
      layout: [
        {
          width: 240,
          height: 300,
        },
      ],
    };
    component.update(
      <Shimmer {...customProps} animationDirection="diagonalDownLeft">
        <Animated.View style={{ height: 300, width: 200 }} />
      </Shimmer>,
    );

    gradient = component.root.findByType(LinearGradient);
    expect(gradient).toBeDefined();
    expect(gradient.props.start).toEqual({ x: 0, y: 0 });
    expect(gradient.props.end).toEqual({ x: 1, y: 0 });

    component.update(
      <Shimmer {...customProps} animationDirection="verticalTop">
        <Text style={{ fontSize: 24 }} />
      </Shimmer>,
    );

    gradient = component.root.findByType(LinearGradient);
    expect(gradient).toBeDefined();
    expect(gradient.props.start).toEqual({ x: 0, y: 0 });
    expect(gradient.props.end).toEqual({ x: 0, y: 1 });

    component.update(
      <Shimmer {...customProps} animationDirection="verticalDown">
        <Text style={{ fontSize: 24 }} />
      </Shimmer>,
    );

    gradient = component.root.findByType(LinearGradient);
    expect(gradient).toBeDefined();
    expect(gradient.props.start).toEqual({ x: 0, y: 0 });
    expect(gradient.props.end).toEqual({ x: 0, y: 1 });

    component.update(
      <Shimmer {...customProps} animationDirection="horizontalLeft">
        <Text style={{ fontSize: 24 }} />
      </Shimmer>,
    );

    gradient = component.root.findByType(LinearGradient);
    expect(gradient).toBeDefined();
    expect(gradient.props.start).toEqual({ x: 0, y: 0 });
    expect(gradient.props.end).toEqual({ x: 1, y: 0 });

    component.update(
      <Shimmer {...customProps} animationDirection="horizontalRight">
        <Text style={{ fontSize: 24 }} />
      </Shimmer>,
    );

    gradient = component.root.findByType(LinearGradient);
    expect(gradient).toBeDefined();
    expect(gradient.props.start).toEqual({ x: 0, y: 0 });
    expect(gradient.props.end).toEqual({ x: 1, y: 0 });

    expect(gradient.props.colors).toEqual([
      DEFAULT_BONE_COLOR,
      DEFAULT_HIGHLIGHT_COLOR,
      DEFAULT_BONE_COLOR,
    ]);
  });
});
