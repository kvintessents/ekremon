const ekremons = {
    models: [
        {
            name: 'Vastik Vanamutt',
            quotes: [
                'Naabrid teevad jälle kisa ja kära.',
                'Poisid kõrval korteris võiksid veidi muusikat maha keerata'
            ]
        },
        {
            name: 'Vastik Hipster',
            quotes: [
                'Kas nägid neid mitte-e-sigareti suitsetajaid?',
                'Õh, eestlastel on ikka nii halb maitse.'
            ]
        }
    ],

    getRandom() {
        return this.models[Math.floor(Math.random() * this.models.length)];
    },

    getAssetUrl(model) {
        return 'assets/images/ekremons/' + this.getSlug(model) + '.png';
    },

    getSlug(model) {
        return model.name.toLowerCase().split(' ').join('-');
    }
}