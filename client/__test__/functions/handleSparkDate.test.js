import { handleSparkDate } from "../../src/functions/handleSparkDate";


describe.skip("Test Spark Date", () => {
  test("Spark Date Test Now", () => {
    const now = new Date();
    const result = handleSparkDate(now);
    expect(result).toBe("now");
  });

  test("Spark Date Test Second", () => {
    const testCases = Array.from({ length: 59 }, (_, index) => {
      const testDate = new Date();
      testDate.setSeconds(testDate.getSeconds() - (index + 1));
      return testDate;
    });

    testCases.forEach((testDate, _) => {
      const result = handleSparkDate(testDate);
      expect(result).toBe(`few seconds ago`);
    });
  });

  test("Spark Date Test Minute", () => {
    const testCases = Array.from({ length: 59 }, (_, index) => {
      const testDate = new Date();
      testDate.setMinutes(testDate.getMinutes() - (index + 1));
      return testDate;
    });

    testCases.forEach((testDate, index) => {
      const result = handleSparkDate(testDate);
      expect(result).toBe(`${index + 1} minute ago`);
    });
  });

  test("Spark Date Test Hour", () => {
    const testCases = Array.from({ length: 23 }, (_, index) => {
      const testDate = new Date();
      testDate.setHours(testDate.getHours() - (index + 1));
      return testDate;
    });

    testCases.forEach((testDate, index) => {
      const result = handleSparkDate(testDate);
      expect(result).toBe(`${index + 1} hour ago`);
    });
  });

  test("Spark Date Test Day", () => {
    const curDay = new Date().toLocaleDateString().split("/")[1];
    const testCases = Array.from({ length: curDay - 1 }, (_, index) => {
      const testDate = new Date();
      testDate.setDate(testDate.getDate() - (index + 1));
      return testDate;
    });

    testCases.forEach((testDate, index) => {
      const result = handleSparkDate(testDate);
      expect(result).toBe(`${index + 1} day ago`);
    });
  });
});
