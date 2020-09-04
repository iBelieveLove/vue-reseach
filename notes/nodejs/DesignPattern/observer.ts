/**
 * @description 观察者模式
 * 观察者模式（Observer Pattern）也称发布订阅模式，它是一种在项目中经常使用的模式。
 * 定义对象间一种一对多的依赖关系，使得每当一个对象改变状态，则所有依赖于它的对象都会得到通知并被自动更新。
 * 观察者模式具有以下4个角色。
 * ■ 抽象主题（Subject）角色：该角色又称为“被观察者”，可以增加和删除观察者对象。
 * ■ 抽象观察者（Observer）角色：该角色为所有的具体观察者定义一个接口，在得到主题的通知时更新自己。
 * ■ 具体主题（Concrete Subject）角色：该角色又称为“具体被观察者”，它将有关状态存入具体观察者对象，在具体主题的内部状态改变时，给所有登记过的观察者发出通知。
 * ■ 具体观察者（Concrete Observer）角色：该角色实现抽象观察者所要求的更新接口，以便使自身的状态与主题的状态相协调。
 */

 // 观察者
class Observer {
  constructor() {

  }
  update(val: any) {

  }
}
// 观察者列表
class ObserverList {
  observerList: Observer[];
  constructor() {
      this.observerList = []
  }
  add(observer: Observer): number {
      return this.observerList.push(observer);
  }
  remove(observer: Object): void {
      this.observerList = this.observerList.filter(ob => ob !== observer);
  }
  count(): number {
      return this.observerList.length;
  }
  get(index): any {
      return this.observerList[index];
  }
}
// 目标
class Subject {
  observers: ObserverList;
  constructor() {
      this.observers = new ObserverList();
  }
  addObserver(observer: Observer): void {
      this.observers.add(observer);
  }
  removeObserver(observer: Observer): void {
      this.observers.remove(observer);
  }
  notify(...args): any {
      let obCount = this.observers.count();
      for (let index: number = 0; index < obCount; index++) {
          this.observers.get(index).update(...args);
      }
  }
}