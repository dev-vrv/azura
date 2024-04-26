interface InterfaceTheme {
    [key: string]: string;
}

interface InterfaceColors {
    theme: InterfaceTheme;
}

export default class Colors implements InterfaceColors {
    theme: InterfaceTheme;

    constructor() {
        this.theme = {
            primary: "rgb(208, 50, 81)",
            secondary: "rgb(25, 25, 34)",
            tertiary: "rgb(47, 47, 88)",
            whiteGlass: "rgba(255, 255, 255, 0.1)",
            darkGlass: "rgba(22, 21, 27, 0.5)",
            white: "#fff",
            dark: "#16151b",
            fade: "#2c2c33",
            info: "#17a2b8",
            success: "#5b9368",
            danger: "#ff9898",
            warning: "#ffc107",
        }
    }

    getTheme() {
        return this.theme;
    }
}