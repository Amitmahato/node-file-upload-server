// Importing mocha and chai
import Mocha from "mocha";
import chai from "chai";

const expect = chai.expect;

// Group of tests using describe
describe("tests", function () {
  // We will describe each single test using it
  it("expect 50 equals 50", () => {
    expect(50).to.equal(50);
  });
});
