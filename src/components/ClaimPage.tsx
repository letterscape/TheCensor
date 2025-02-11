import { Box, Button, Card, Flex, Grid, Link, Text } from "@radix-ui/themes";

const claimData: ClaimContent[] = [
  {id: '1', title: 'Photographs to Pixels: Exploring “a Sunday in the Park” with Loackme', url: 'https://highlight.mirror.xyz/C0r49cPdZNckBw0t5Qcy__bcZl-ymxs8Ckgex7nimkM', staking: '0', token: '3'},
  {id: '2', title: 'Why Every Web3 Startup Should be Building & Shipping Frames', url: 'https://y.mirror.xyz/8lCYES9fafs1CElTGXU62uMBSgCl4QTzTx9i5abNK2M', staking: '15.8', token: '5'},
  {id: '3', title: 'Why cryptocurrencies are here to stay, regardless of what governments do', url: 'Enrique Dans', staking: '7.3', token: '1'},
]

type ClaimContent =  {
  id: string,
  title: string,
  url: string,
  staking: string,
  token: string,
}

const ClaimPage = () => {

  return (
    <Box p="4">
      <Flex direction="column" gap="2">
        <Grid columns="2" gap="1" width="100%">
          {claimData.map((item) => (
            <Card 
              key={item.id} 
              size="2"
              style={{
                width: '80%', 
                height: '200px', 
                padding: '16px',
                margin: '10px',
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              }}
            >
              <Flex direction="column" gap="2">
                <Flex justify="between" align="start" style={{ height: '80px' }}>
                  <Link href={item.url} target="_blank" rel="noopener noreferrer">
                    <Text size="4" weight="bold">
                      {item.title}
                    </Text>
                  </Link>
                </Flex>
                <Grid columns="2" gap="6" >
                  <Flex justify="start" align="center" >
                    <Text size="2" color="gray" style={{ margin: '0 10px' }}>
                      Staking:
                    </Text>
                    <Text>
                    {item.staking}
                    </Text>
                  </Flex>
                  <Flex justify="start" align="center" >
                    <Text size="2" color="gray" style={{ margin: '0 10px' }}>
                      Token:
                    </Text>
                    <Text>
                      {item.token}
                    </Text>
                  </Flex>
                </Grid>
                <Button color="violet" variant="soft" style={{ cursor: "pointer", margin: '20px 0' }}>Claim</Button>
              </Flex>
            </Card>
          ))}
        </Grid>
      </Flex>
    </Box>
  );
}

export default ClaimPage;