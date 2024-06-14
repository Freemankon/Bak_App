import { NearBindgen, near, call, view, Vector } from 'near-sdk-js'
import { Order } from './model'

@NearBindgen({})
class RestOrders {
  orders: Vector<Order> = new Vector<Order>("o-uid");

  @call({})
  add_order({ date, amount }: { date: number, amount: number }) {
    const order: Order = { date, amount };
    this.orders.push(order);
  }

  @view({})
  get_orders({ from = 0, to = Number.MAX_VALUE }: { from: number, to: number }): Order[] {
    return this.orders.toArray().filter((order) => order.date >= from && order.date <= to);
  }
  
  @view({})
  total_orders(): number { 
    return this.orders.length;
  }

}
