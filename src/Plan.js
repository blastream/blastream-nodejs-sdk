import Instance from "./Instance";

export default class Panel extends Instance{

    getPlans() {
        return this.get('/plans');
    }
}