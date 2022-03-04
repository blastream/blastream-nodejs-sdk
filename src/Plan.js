import Instance from "./Instance";

export default class Panel extends Instance{

    async getPlans() {
        return await this.get('/plans');
    }
}