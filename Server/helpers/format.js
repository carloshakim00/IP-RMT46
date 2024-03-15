function toRupiah(value) {
    return value.toLocaleString("id-ID", {
        style: `currency`,
        currency: `IDR`
    })
}

function formatDate(value){
    return value.toISOString().slice(0,10);
}

module.exports = { toRupiah , formatDate};
