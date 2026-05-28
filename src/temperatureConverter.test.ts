import { TemperatureConverter } from "./temperatureConverter";

describe("TemperatureConverter", () => {

    const converter = new TemperatureConverter();

    test("Should convert Fahrenheit to Celsius", () => {
        expect(converter.fahrenheitToCelsius(32)).toBe(0);
    });

    test("Should convert Celsius to Fahrenheit", () => {
        expect(converter.celsiusToFahrenheit(0)).toBe(32);
    });

});