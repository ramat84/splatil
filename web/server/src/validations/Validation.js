module.exports = {
    validate(schema, req, res, next) {
        const v_res = schema.validate(req.body)

        if (v_res.error) {
            let error_message = '';

            v_res.error.details.forEach( (err) => {
                error_message += err.message + "<br>";
            } );

            res.status(400).send({error: error_message})
        } else {
            next()
        }
    }
}
