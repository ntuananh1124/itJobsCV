import AllRoute from './components/AllRoute';
import { ConfigProvider } from 'antd';

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#1DA57A", // Màu chủ đạo bạn muốn thay đổi
          colorLink: "#1DA57A",
        },
      }}
    >
      <AllRoute />
    </ConfigProvider>
  );
}

export default App;
