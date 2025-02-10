import { Box, Card, Flex, Text } from '@radix-ui/themes';

const data = [
  { id: 1, title: '文章标题 1', author: '作者 A', project: '项目A', status: '已发布' },
  { id: 2, title: '文章标题 2', author: '作者 B', project: '项目B', status: '草稿' },
  { id: 3, title: '文章标题 3', author: '作者 C', project: '项目C', status: '已归档' },
  // 可以根据需要添加更多数据
];

const CensorList = () => {
  return (
    <Box p="4">
      <Flex direction="column" gap="6">
        {data.map((item) => (
          <Card 
            key={item.id} 
            size="2"
            style={{
              width: '80%', // 自定义宽度
              height: '110px', // 自定义高度
              padding: '16px',
              borderRadius: '8px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Flex direction="column" gap="2">
              <Text size="4" weight="bold">
                {item.title}
              </Text>
              <Text size="2" color="gray">
                  作者: {item.author}
                </Text>
              <Flex justify="between" align="center">
                <Text size="2" color="gray">
                  来自: {item.project}
                </Text>
                <Text size="2" color="gray">
                  状态: {item.status}
                </Text>
              </Flex>
            </Flex>
          </Card>
        ))}
      </Flex>
    </Box>
  );
};

export default CensorList;
