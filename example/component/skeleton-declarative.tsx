import type { Glitzy as NGlitzy } from "glitzy-native/expo";
import type { GlitzyImplProps } from "glitzy-native/types";

export function Skeleton({
  animationType = "shiver",
  bg,
  boneColor = "#F8F8F8",
  highlightColor = "#d5d5d5",
  Glitzy,
  ...rest
}: Omit<GlitzyImplProps, "isLoading"> & {
  bg?: string;
  Glitzy: typeof NGlitzy;
}) {
  return (
    <Glitzy.Layout
      animationType={animationType}
      boneColor={boneColor}
      highlightColor={highlightColor}
      {...rest}
      isLoading
    >
      <Glitzy.Box
        alignSelf="center"
        borderColor="#F0F2F9"
        borderRadius={12}
        backgroundColor={bg}
        borderWidth={1}
        justifyContent="space-between"
        padding={16}
        rowGap={32}
      >
        <Glitzy.Box
          columnGap={16}
          alignItems="center"
          justifyContent="space-between"
          flexDirection="row"
        >
          <Glitzy.Circle size={32} />
          <Glitzy.Box height={16} width={80} />
        </Glitzy.Box>
        <Glitzy.Text numberOfLines={2} lineHeight={20} />
      </Glitzy.Box>
    </Glitzy.Layout>
  );
}
