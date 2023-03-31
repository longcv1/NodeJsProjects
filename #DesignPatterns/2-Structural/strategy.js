const mapping = {
    LIVCFP : test1,
    RETCFM : test2,
}

function test1() {
    console.log('test1');
}

function test2() {
    console.log('test2');
}

function getValue() {
    return mapping['LIVCFP']();
}

getValue();

const makePayload = (parcel) => {
    const payloadBuilder = new PayloadBuilder();
    const payload = payloadBuilder
    .setParcel(parcel)
    .setBoxAllocated(parcel)
    .build();

    return payload;
}







