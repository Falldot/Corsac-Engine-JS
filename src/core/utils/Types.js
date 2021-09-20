const types = {
    any: Array,
    int8: Int8Array,
    uint8: Uint8Array, 
    int16: Int16Array,
    uint16: Uint16Array,
    int32: Int32Array,
    uint32: Uint32Array,
    float32: Float32Array,
    float64: Float64Array,
};

const TypeContainer = (type, size) => {
    if (typeof type === "object") {
        for (const key in type) type[key] = new type[key](size);
        return type;
    } else if (typeof type === "function") {
        return new type(size);
    } else {
        throw new Error('Invalid type format! => ' + type);
    }
};

module.exports = {
    types, TypeContainer
};