import { Children, type PropsWithChildren } from "react";
import type { ViewStyle } from "react-native";
import type {
  CustomViewStyle,
  GlitzyLayoutImplProps,
  GlitzyImplProps,
} from "./types";

const buildLayout = (children: any) => {
  return Children.map(
    children,
    (
      child: React.ReactElement<{ children?: any; style: any; key: any }>
    ): CustomViewStyle => {
      const layoutStyle = (() => {
        // @ts-expect-error `__type` not known
        const type = child.type?.__type;
        if (!type) {
          throw new Error(
            `Only Layout components like "Box", "Circle" and "Text" can be used as its children`
          );
        }

        switch (type) {
          case "LayoutBox":
            return getBoxStyle(child.props as any);
          case "LayoutCircle":
            return getCircleStyle(child.props as any);
          case "LayoutText":
            return getTextStyle(child.props as any);
        }
      })();

      if (child.props?.children) {
        return {
          ...layoutStyle,
          children: buildLayout(child.props.children),
          key: child.key ?? undefined,
        };
      }

      return {
        ...layoutStyle,
        key: child.key ?? undefined,
      };
    }
  );
};

export function createLayout<
  G extends GlitzyImplProps = GlitzyImplProps,
  T extends GlitzyLayoutImplProps = GlitzyLayoutImplProps
>(Glitzy: (props: G) => JSX.Element) {
  return function Layout(props: T & { children: React.ReactNode }) {
    const layout = buildLayout(props.children);

    return (
      <Glitzy {...(props as any)} layout={layout}>
        {props.renderChildren}
      </Glitzy>
    );
  };
}

type BoxProps = PropsWithChildren<ViewStyle>;
function getBoxStyle({ children, ...props }: BoxProps): CustomViewStyle {
  return {
    ...props,
  };
}
export function Box(_: BoxProps): JSX.Element {
  throw new Error(`Glitzy's "Box" must be a child of Glitzy's "Layout"`);
}
Box.__type = "LayoutBox";

type CircleProps = Omit<ViewStyle, "width" | "height"> & {
  size: number | `${number}%`;
};
function getCircleStyle({
  borderRadius = "50%",
  size = 16,
  ...props
}: CircleProps): CustomViewStyle {
  if (typeof size === "string" && !size.endsWith("%")) {
    throw new Error("Radius percentage must end with %");
  }

  return {
    borderRadius,
    height: size,
    width: size,
    ...props,
  };
}
export function Circle(_: CircleProps): JSX.Element {
  throw new Error(`Glitzy's "Circle" must be a child of Glitzy's "Layout"`);
}
Circle.__type = "LayoutCircle";

type TextProps = Omit<ViewStyle, "width" | "height"> & {
  lineHeight?: number;
  numberOfLines?: number;
};
function getTextStyle({
  lineHeight = 12,
  numberOfLines = 1,
  ...props
}: TextProps): CustomViewStyle {
  const height = 0.8 * lineHeight;
  const margin = 0.2 * lineHeight;

  return {
    children: Array.from({ length: numberOfLines }, (_, index) => ({
      height,
      width: numberOfLines > 1 && index + 1 === numberOfLines ? "80%" : "100%",
      ...props,
    })),
    rowGap: margin * 2,
    marginVertical: margin,
  };
}
export function Text(_: TextProps): JSX.Element {
  throw new Error(`Glitzy's "Text" must be a child of Glitzy's "Layout"`);
}
Text.__type = "LayoutText";
