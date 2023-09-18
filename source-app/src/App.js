import './App.css';
import InputForm from './pages/InputForm';
import TabelBilangan from './pages/TabelBilangan';
import { Col, Row } from 'antd';

function App() {
  return (
    <div className="App">
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={24}>
          <InputForm />
        </Col>
      </Row>
      <Row>
        <Col xs={24} sm={24} md={24}>
          <TabelBilangan />
        </Col>
      </Row>
    </div>
  );
}

export default App;