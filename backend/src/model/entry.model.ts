// Define the schema for the entry model
module.exports = (mongoose: any): any => {
    const Entry = mongoose.model('entry',
        mongoose.Schema(
            {
                title: String,
                author: String,
                text: String,
                date: String,
                time: String,
            },
        )
    );

    return Entry;
};