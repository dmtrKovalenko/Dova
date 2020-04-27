let serializeVariant = [%bs.raw
  {|
    function (variant) {
      return JSON.stringify({
        variant,
        tag: typeof variant === "number" ? undefined : variant.tag
      });
    }
  |}
];

let deserializeVariant: string => 'a = [%bs.raw
  {|
    function (serializedString) {
      const { tag, variant } = JSON.parse(serializedString);
      if (typeof variant === "number") {
        return variant;
      }

      variant.tag = tag;
      return variant;
    }
  |}
];