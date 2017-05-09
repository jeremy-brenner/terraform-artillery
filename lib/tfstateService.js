const fs = require('fs');

function readState() {
    var stateData = fs.readFileSync(`${__dirname}/../terraform_templates/terraform.tfstate`, 'utf8');

    let terraformState = JSON.parse(stateData);

    let artilleryFunctions = terraformState.modules.filter(module => {
        return module.resources['aws_lambda_function.artillery_lambda'] !== undefined;
    }).map(lambda => {
        let functionName = lambda.resources['aws_lambda_function.artillery_lambda'].primary.id;
        let functionRegion = functionName.substring(functionName.indexOf('-') + 1, functionName.length);
        return {
            name: functionName,
            region: functionRegion
        };
    });
    return artilleryFunctions;
};
exports.readState = readState;