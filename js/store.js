const dict = {};

const store = {
    set(name, value) {
        dict[name] = value;
    },

    get(name, defaultValue = null) {
        if (dict[name]) {
            return dict[name];
        }

        dict[name] = defaultValue;

        return defaultValue;
    }
}