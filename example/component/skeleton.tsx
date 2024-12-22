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
  Glitzy: (props: GlitzyImplProps) => JSX.Element;
}) {
  return (
    <Glitzy
      animationType={animationType}
      boneColor={boneColor}
      highlightColor={highlightColor}
      {...rest}
      isLoading
      layout={[
        {
          children: [
            {
              alignSelf: "center",
              borderColor: "#F0F2F9",
              borderRadius: 12,
              backgroundColor: bg,
              borderWidth: 1,
              children: [
                {
                  children: [
                    {
                      alignSelf: "center",
                      borderRadius: 16,
                      height: 32,
                      key: "image",
                      width: 32,
                    },
                    {
                      height: 16,
                      width: 80,
                    },
                  ],
                  columnGap: 16,
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexDirection: "row",
                },
                {
                  children: [
                    {
                      borderRadius: 4,
                      height: 16,
                      width: "100%",
                    },
                    {
                      borderRadius: 4,
                      height: 16,
                      width: "90%",
                    },
                  ],
                  rowGap: 10,
                },
              ],
              justifyContent: "space-between",
              padding: 16,
              rowGap: 32,
            },
          ],
          width: 200,
        },
      ]}
    />
  );
}
