import { ConnectButton } from "@mysten/dapp-kit";
import { Box, Flex, Heading, Separator } from "@radix-ui/themes";


function App() {

  return (
    <>
      <Flex
        position="sticky"
        px="4"
        py="2"
        justify="between"
        style={{
          borderBottom: "1px solid var(--gray-a2)",
        }}
      >
        <Box>
          <Heading>TheCensor</Heading>
        </Box>

        <Flex justify='center' align='center' gap='4'>
          <Box>
            Setting
          </Box>
          <Separator orientation="vertical" size="2" />
          <Box>
            <ConnectButton />
          </Box>
        </Flex>
        
      </Flex>
    </>
  );
}

export default App;
