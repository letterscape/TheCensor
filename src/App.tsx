import { ConnectButton } from "@mysten/dapp-kit";
import { Box, Button, Container, Flex, Heading, Separator } from "@radix-ui/themes";
import CensorList from "./components/CensorList";
import React from "react";
import Setting from "./components/Setting";

export enum HomePageRedirectionEnum {
  List,
  Setting
}
function App() {
  const [homePageRedirection, setHomePageRedirection] = React.useState<HomePageRedirectionEnum>(HomePageRedirectionEnum.List);
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
        <Flex justify='center' align='center'>
          <Box>
            <Button 
              variant='ghost'
              size="3"
              onClick={() => {
                setHomePageRedirection(HomePageRedirectionEnum.List);
              }}
            >
              <Heading>TheCensor</Heading>
            </Button>
          </Box>
        </Flex>

        <Flex justify='center' align='center' gap='4'>
          <Box>
          <Button 
            variant='ghost'
            size="3"
            onClick={() => {
              setHomePageRedirection(HomePageRedirectionEnum.Setting);
            }}
          >
            Setting
          </Button>
          </Box>
          <Separator orientation="vertical" size="2" />
          <Box>
            <ConnectButton />
          </Box>
        </Flex>
        
      </Flex>
      { homePageRedirection == HomePageRedirectionEnum.List ?
        <Box>
          <CensorList/>
        </Box>
        :
        homePageRedirection == HomePageRedirectionEnum.Setting ?
        <Container>
          <Setting />
        </Container>
        :
        null
      }
      
    </>
  );
}

export default App;
