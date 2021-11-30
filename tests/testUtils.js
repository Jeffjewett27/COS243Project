module.exports = {
    async testRelationForId(sourceClass, relation, column, id) {
        await sourceClass.query()
            .select('*')
            .where(column, id)
            .first()
            .withGraphFetched(relation)
            .then(user => {
                console.log(user);
            })
            .catch(error => console.log(error.message))
    },
}