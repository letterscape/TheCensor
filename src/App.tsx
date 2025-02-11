import { ConnectButton } from "@mysten/dapp-kit";
import { Box, Button, Container, Flex, Heading, IconButton, Separator } from "@radix-ui/themes";
import CensorList from "./components/CensorList";
import React from "react";
import Setting from "./components/Setting";
import { RowsIcon } from "@radix-ui/react-icons";
import Contents from "./components/Contents";

export enum HomePageRedirectionEnum {
  LIST,
  SETTING,
  CONTENTS,
}
function App() {
  const [homePageRedirection, setHomePageRedirection] = React.useState<HomePageRedirectionEnum>(HomePageRedirectionEnum.LIST);

  return (
    <>
      {homePageRedirection !== HomePageRedirectionEnum.CONTENTS ? 
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
            <Flex justify='center' align='center' gap='4'>
              <IconButton 
                className="icon-button" 
                size="2" 
                variant="ghost"
                onClick={() => setHomePageRedirection(HomePageRedirectionEnum.CONTENTS)}
              >
                <RowsIcon  />
              </IconButton>
              <Box>
                <Button 
                  style={{ cursor: "pointer" }}
                  variant='ghost'
                  size="3"
                  onClick={() => setHomePageRedirection(HomePageRedirectionEnum.LIST)}
                >
                  <Heading>TheCensor</Heading>
                </Button>
              </Box>
            </Flex>

            <Flex justify='center' align='center' gap='4'>
              <Box>
              <Button 
                style={{ cursor: "pointer" }}
                variant='ghost'
                size="3"
                onClick={() => setHomePageRedirection(HomePageRedirectionEnum.SETTING)}
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
          { homePageRedirection == HomePageRedirectionEnum.LIST ?
            <CensorList/>
            :
            homePageRedirection == HomePageRedirectionEnum.SETTING ?
            <Container>
              <Setting />
            </Container>
            :
            null
          }
        </>
      : 
        <Contents onReturn={(status) => setHomePageRedirection(status)}/>
      }
    </>
  );
}

export default App;
