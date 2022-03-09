
'use strict';
import Instance from "./Instance";

module.exports = class Panel extends Instance{

    async getPlans() {
        return await this.get('/plans');
    }
}