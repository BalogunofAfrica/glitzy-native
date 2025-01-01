## Glitzy Native ✨ [![npm version](https://img.shields.io/npm/v/glitzy-native.svg?style=flat-square)](https://www.npmjs.com/package/glitzy-native)

<p align="center">
  <a href="/">
      <img width="400px" height="400px" alt="Glitzy Native ✨" src="https://raw.githubusercontent.com/BalogunofAfrica/glitzy-native/master/docs/glitzy.png" />
  </a>
</p>

> ℹ️ **Note**  
> This was originally a fork of [react-native-skeleton-content-nonexpo](https://github.com/alexZajac/react-native-skeleton-content-nonexpo), which depends on the gradient implementation in [react-native-linear-gradient](https://www.npmjs.com/package/react-native-linear-gradient "default gradient package"). It also resolves the issue with using Reanimated >= v2.0.0 and removes the hard requirement on Redash.

A simple and fully customizable implementation of a skeleton placeholder for React Native. Works on both iOS and Android.

- [Installation](#installation)
- [Usage](#usage)
- [Props](#props)
- [Examples](#examples)

### Installation

```shell script
bun add glitzy-native
```

or

```shell script
yarn add glitzy-native
```

or

```shell script
npm install glitzy-native
```

Also install reanimated which is used as the animation driver:

```shell script
bun install react-native-reanimated
```

or

```shell script
npm install react-native-reanimated
```

or

```shell script
yarn add react-native-reanimated
```

### Usage

This package exposes three different `animationType`: **shiver**, **pulse** and **none**. If you want to use the shiver `animationType` you would need to have a gradient package or implementation.

You have the flexibility of providing your own linear gradient implementation based on your project, all you need to do is to pass the implementation via the `LinearGradientComponent` prop. There are implementation files for common gradient packages like [expo](https://docs.expo.dev/versions/latest/sdk/linear-gradient/ "expo linear gradient"), [skia](https://shopify.github.io/react-native-skia/docs/shaders/gradients/#linear-gradient "skia linear gradient component") and [react-native-linear-gradient](https://www.npmjs.com/package/react-native-linear-gradient "react native linear gradient").

#### 1. Import glitzy-native:

```tsx
import { Glitzy } from "glitzy-native";
```

For **shiver** animation, you can import based on the default linear gradient implementations ⬇️

If you use expo workflow, install `expo-linear-gradient` and import like so:

```ts
import { Glitzy } from "glitzy-native/expo";
```

If you prefer to use `@shopify/react-native-skia`:

```ts
import { Glitzy } from "glitzy-native/skia";
```

If you prefer to use `react-native-linear-gradient`:

```ts
import { Glitzy } from "glitzy-native/native";
```

OR you can just provide your own gradient implementation and use it like so:

```tsx
import { Glitzy } from "glitzy-native";
...
const Gradient = /* Your gradient implementation **/
...
  <Glitzy LinearGradientComponent={Gradient} {...props} />
...
```

#### 2. Once you create the Skeleton, you have two options:

- **Child Layout** : The component will figure out the layout of its bones with the dimensions of its direct children.
- **Custom Layout** : You provide a prop `layout` to the component specifying the size of the bones (see the [Examples](#examples) section below). Here is the example with a custom layout. A key prop is optional but highly recommended.

```tsx
export default function Placeholder() {
  return (
    <Glitzy.Layout
      containerStyle={{ flex: 1, width: 300 }}
      isLoading={false}
      renderContent={
        <>
          <Text style={styles.normalText}>Your content</Text>
          <Text style={styles.bigText}>Other content</Text>
        </>
      }
    >
      <Glitzy.Box key="someId" width={220} height={20} marginBottom={6} />
      <Glitzy.Box key="someOtherId" width={180} height={20} marginBottom={6} />
    </Glitzy.Layout>
  );
}

// OR

export default function Placeholder() {
  return (
    <Glitzy
      containerStyle={{ flex: 1, width: 300 }}
      isLoading={false}
      layout={[
        { key: "someId", width: 220, height: 20, marginBottom: 6 },
        { key: "someOtherId", width: 180, height: 20, marginBottom: 6 },
      ]}
    >
      <Text style={styles.normalText}>Your content</Text>
      <Text style={styles.bigText}>Other content</Text>
    </Glitzy>
  );
}
```

#### 3. Then simply sync the prop `isLoading` to your state to show/hide the Skeleton when the assets/data are available to the user.

```tsx
export default function Placeholder() {
  const [loading, setLoading] = useState(true);
  return (
    <Glitzy
      containerStyle={{ flex: 1, width: 300 }}
      isLoading={isLoading}
      {...otherProps}
    />
  );
}
```

### Props

| Name                    | Type             | Default                                             | Description                                                                                                                       |
| ----------------------- | ---------------- | --------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| isLoading               | bool             | **required**                                        | Shows the skeleton bones when true                                                                                                |
| LinearGradientComponent | ReactComponent   | **required** for shiver animation                   | The gradient implementation to use for the "shiver" animation                                                                     |
| layout                  | array of objects | []                                                  | A custom layout for the skeleton bones                                                                                            |
| duration                | number           | 1200 ms                                             | Duration of one cycle of animation                                                                                                |
| containerStyle          | object           | flex: 1                                             | The style applied to the View containing the bones                                                                                |
| easing                  | Easing           | bezier(0.5, 0, 0.25, 1)                             | Easing of the bones animation                                                                                                     |
| animationType           | string           | "shiver"                                            | The animation to be used for animating the bones (see demos below)                                                                |
| animationDirection      | string           | "horizontalRight" **only for shiver animationType** | Used only for shiver animation, describes the direction and end-point (ex: horizontalRight goes on the x-axis from left to right) |
| boneColor               | string           | "#E1E9EE"                                           | Color of the bones                                                                                                                |
| highlightColor          | string           | "#F2F8FC"                                           | Color of the highlight of the bones                                                                                               |

### Examples

See the [example app](./example/ "sample app") to experiment:

**1** - Changing the direction of the animation (animationDirection prop) :

<p align="center">
<img width="300px" src="https://raw.githubusercontent.com/alexZajac/react-native-skeleton-content/master/demos/direction_change.gif" />
</p>

```tsx
export default function Placeholder() {
  return (
    <Glitzy
      containerStyle={{ flex: 1, width: 300 }}
      animationDirection="horizontalLeft"
      isLoading={true}
      // ...
    />
  );
}
```

**2** - Changing the colors and switching to "pulse" animation (boneColor, highlightColor and animationType prop) :

<p align="center">
<img width="300px" src="https://raw.githubusercontent.com/alexZajac/react-native-skeleton-content/master/demos/color_change.gif" />
</p>

```tsx
export default function Placeholder() {
  return (
    <Glitzy
      containerStyle={{ flex: 1, width: 300 }}
      boneColor="#121212"
      highlightColor="#333333"
      animationType="pulse"
      isLoading={true}
      // ...
    />
  );
}
```

**3** - Customizing the layout of the bones :

<p align="center">
<img width="300px" src="https://raw.githubusercontent.com/alexZajac/react-native-skeleton-content/master/demos/layout_change.gif" />
</p>

There are 2 ways to customize the layout of the bones, either using the declarative API (via layout components) or imperatively by building your layout.

```tsx
// Declarative:
export default function Placeholder() {
  return (
    <Glitzy.Layout
      containerStyle={{ flex: 1, width: 300 }}
      animationDirection="horizontalLeft"
      isLoading={true}
      // ...
    >
      {/** long line */}
      <Glitzy.Box width={220} height={20} marginBottom={6} />
      {/** short line */}
      <Glitzy.Box width={180} height={20} marginBottom={6} />
    </Glitzy.Layout>
  );
}

// Imperative:
export default function Placeholder() {
  return (
    <Glitzy
      containerStyle={{ flex: 1, width: 300 }}
      animationDirection="horizontalLeft"
      layout={[
        // long line
        { width: 220, height: 20, marginBottom: 6 },
        // short line
        { width: 180, height: 20, marginBottom: 6 },
        // ...
      ]}
      isLoading={true}
      // ...
    />
  );
}
```

**4** - Syncing skeleton animations in groups

Say we have a group of Glitzy Skeletons that we want to visually keep their animation in sync no matter when any of them mounts, we can wrap these skeletons as children of `Glitzy.Group`

Before:

```tsx
export default function Placeholder() {
  return (
    <>
      <Glitzy.Layout
        isLoading={true}
        // ...
      >
        <Glitzy.Box width={200}>{/** ... */}</Glitzy.Box>
      </Glitzy.Layout>
      <Glitzy
        layout={[
          {
            children: [
              //  ...
            ],
            width: 200,
          },
          // ...
        ]}
        isLoading={true}
        // ...
      />
    </>
  );
}
```

After:

```tsx
export default function Placeholder() {
  return (
    <Glitzy.Group>
      <Glitzy.Layout
        isLoading={true}
        // ...
      >
        <Glitzy.Box width={200}>{/** ... */}</Glitzy.Box>
      </Glitzy.Layout>
      <Glitzy
        layout={[
          {
            children: [
              //  ...
            ],
            width: 200,
          },
          // ...
        ]}
        isLoading={true}
        // ...
      />
    </Glitzy.Group>
  );
}
```

<p align="center">
<img  width="300px" src="https://raw.githubusercontent.com/BalogunofAfrica/glitzy-native/master/docs/comparison-group.gif" />
</p>

In the before case (without group), the animation of each skeleton in the group is independent and kicks off when the skeleton mounts. In the after case (with group), the animation is controlled in a group so no matter when any skeleton is mounted within that group, its animation is kept in sync with the rest of the group.
