module.exports = (mongoose: any): any => {
    const Entry = mongoose.model('entry',
        mongoose.Schema(
            {
                title: String,
                text: String,
                date: String,
                time: String,
                author: String,
            },
        )
    );

    return Entry;
};