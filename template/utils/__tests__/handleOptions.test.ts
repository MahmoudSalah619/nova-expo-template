import handleArrayToOptions from "@/utils/handleArryasToOptions";
import handleOptions from "@/utils/handleOptions";

describe.each([
  ["handleOptions", handleOptions],
  ["handleArryasToOptions", handleArrayToOptions],
])("%s", (_name, toOptions) => {
  it("maps items to { label, value } using `name` and `id` by default", () => {
    expect(toOptions([{ id: "1", name: "Cairo" }])).toEqual([
      { label: "Cairo", value: "1" },
    ]);
  });

  it("uses a custom label key", () => {
    expect(toOptions([{ id: "1", title: "Cairo" }], "title")).toEqual([
      { label: "Cairo", value: "1" },
    ]);
  });

  it("returns an empty list when called without a list", () => {
    expect(toOptions()).toEqual([]);
  });
});
