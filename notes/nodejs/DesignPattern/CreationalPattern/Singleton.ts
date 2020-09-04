/**
 * 单例模式有两种
 * 饿汉式单例类：类加载时，就进行对象实例化；
 * 懒汉式单例类：第一次引用类时，才进行对象实例化。
 */

class Singleton {

  private instance: Singleton = undefined;
  constructor () {

  }

  getInstance() {
    if (this.instance !== undefined) {
      return this.instance;
    }
    this.instance = new Singleton();
    return this.instance;
  }
}