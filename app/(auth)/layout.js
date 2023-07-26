"use client";

import { AppShell, Center, ColorSchemeProvider, MantineProvider, Navbar, Text, Title, createStyles } from "@mantine/core";
import Link from "next/link";
import { useEffect, useState } from "react";

const useStyles = createStyles((theme) => ({
  icon: {
    color: theme.colors.blue[6],
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: -0.5,
    cursor: 'default',
    userSelect: 'none'
  }
}));

export default function Layout({ children }) {
  const [colorScheme, setColorScheme] = useState("dark");
  const { classes } = useStyles();

  useEffect(() => {
    const savedColorScheme = localStorage.getItem('color-scheme');
    if (savedColorScheme)
      setColorScheme(savedColorScheme);
  }, [])

  return (
    <ColorSchemeProvider colorScheme={colorScheme}>
      <MantineProvider withGlobalStyles withNormalizeCSS
        theme={{
          colorScheme: colorScheme,
        }}>

        <AppShell
          padding="md"
          navbar={<Navbar width={{ base: 500 }} p="xs">
            <Text className={classes.icon} m='xl'>Nexvest</Text>
            <Title order={2} mx='xl' my='6rem'>Hi, Welcome Back</Title>
          </Navbar>}
          styles={(theme) => ({
            main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
          })}>
          <Center h='100%'>
            {children}
          </Center>
        </AppShell>
      </MantineProvider>
    </ColorSchemeProvider>
  )
}