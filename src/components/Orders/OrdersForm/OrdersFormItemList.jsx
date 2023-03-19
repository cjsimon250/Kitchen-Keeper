function OrdersFormItemList({ inventoryItems }) {
  return (
    <>
      {inventoryItems.map((item, index) => {
        console.log(item);
        return (
          <li key={index}>
            {item.item}: {item.quantity} {item.unit}
          </li>
        );
      })}
    </>
  );
}

export default OrdersFormItemList;
