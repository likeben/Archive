const textRowStyle = {
  fontSize: 14,
  marginBottom: 5,
  display: 'flex',
  justifyContent: 'space-between',
  paddingRight: 10,
};

const TextRow = ({ label, text }) => (
  <p style={textRowStyle}>
    <span>{label}: </span>
    <span>{text}</span>
  </p>
);

const IncomeItem = ({ income }) => (
  <div style={{ marginBottom: 10 }}>
    <Card full>
      <Card.Header
        title={<span style={{ fontSize: 14, color: '#555' }}>{income.orderCode}</span>}
        extra={<span style={{ fontSize: 14 }}>{income.orderDate}</span>}
      />
      <Card.Body>
        <TextRow label="下单人" text={income.customer ? income.customer.name : ''} />
        <TextRow label="订单金额" text={income.orderAmount} />
        <TextRow label="收益金额" text={income.income} />
      </Card.Body>
    </Card>
  </div>
);