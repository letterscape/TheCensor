import { Box, Button, Card, Flex, Grid, IconButton, Link, Text } from '@radix-ui/themes';
import { contentData } from '../contentDatas';
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { HomePageRedirectionEnum } from '../App';

const Contents = ({onReturn}: {onReturn: (status: HomePageRedirectionEnum) => void}) => {
  return (
    <>
      <Box p="4">
        <Flex direction="column" gap="2">
          <IconButton 
            className="back-button" 
            size="2" 
            variant="ghost"
            onClick={() => onReturn(HomePageRedirectionEnum.LIST)}
          >
            <ArrowLeftIcon  />
          </IconButton>
          <Grid columns="1" gap="1" width="100%">
            {contentData.map((item) => (
              <Card 
                key={item.id} 
                size="2"
                style={{
                  width: '80%', 
                  height: '100px', 
                  padding: '16px',
                  margin: '10px',
                  borderRadius: '8px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                }}
              >
                <Flex direction="column" gap="2">
                  <Flex justify="start" align="center">
                    <Link href={item.url} target="_blank" rel="noopener noreferrer">
                      <Text size="4" weight="bold" style={{margin: '0 0 10px'}}>
                        {item.title}
                      </Text>
                    </Link>
                  </Flex>
                  <Flex justify="between" align="center">
                    <Flex justify="start" align="center" gap='6'>
                      <Text size="2" color="gray">
                        {item.author}
                      </Text>
                      <Text size="2" color="gray">
                        {item.date}
                      </Text>
                    </Flex>
                    <Button color="mint" variant="soft" style={{ cursor: "pointer" }}>Register</Button>
                  </Flex>
                </Flex>
              </Card>
            ))}
          </Grid>
        </Flex>
      </Box>
    </>
  );
}

export default Contents;

export type Content = {
  id: string
  title: string
  author: string
  url: string
  project: string
  homepage: string
  date: string
  content: string
}