import getSerializedQueryArgs from "@/utils/getSerializedQueryArgs";

describe("getSerializedQueryArgs", () => {
  it("ignores `page` so every page shares one cache entry", () => {
    const key = getSerializedQueryArgs({
      endpointName: "getProducts",
      queryArgs: { page: 3, search: "shoe", category: 2 },
    });

    expect(key).toBe("getProducts-(search=shoe)-(category=2)");
  });

  it("returns just the endpoint name when there are no args", () => {
    expect(
      getSerializedQueryArgs({ endpointName: "getProducts", queryArgs: undefined }),
    ).toBe("getProducts");
  });

  it("gives different keys for different filters", () => {
    const a = getSerializedQueryArgs({ endpointName: "e", queryArgs: { q: "a" } });
    const b = getSerializedQueryArgs({ endpointName: "e", queryArgs: { q: "b" } });

    expect(a).not.toBe(b);
  });
});
