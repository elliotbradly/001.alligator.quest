import { MantineProvider, Box, Title, Text, Stack, Container } from '@mantine/core';

import SelectionStack from './components/selectionStack/SelectionStack';


function ContentsPage() {
    return (
        <Container size="md" p={0} style={{ backgroundColor: '#ffffff', minHeight: '100vh', color: '#000' }}>
            <Box p={40}>
                <Title order={1} style={{ fontSize: 72, fontWeight: 300, marginBottom: 40 }}>

                    FUN FOOT

                </Title>

                <Title order={2} style={{ fontSize: 24, fontWeight: 500, marginBottom: 40 }}>

                    DESIGN WORLD

                </Title>


                <SelectionStack></SelectionStack>


                <Box mt={80}>
                    <Title order={3} style={{ fontSize: 18, fontWeight: 600, marginBottom: 16 }}>
                        DISCLAIMER
                    </Title>
                    <Text size="sm" style={{ lineHeight: 1.6 }}>
                        Degenesis advocates tolerance and international understanding. The game world of Degenesis has evolved from ours and distorts it into an imaginary future. Conflicts within the game world are, of course, not real - and we do not wish for them to be, either. They only exist for excitement's sake. Although we know this kind of conflict from films, we urge you to use them with caution. None of the seven Cultures mentioned in Degenesis is better than any of the others. All of those Cultures have an equal right to exist in the game world of Degenesis. We have actively avoided the term "race" common to RPGs as we deem it discriminatory. We strictly oppose violence and racism. Illustrations of combat action are not meant to promote violence, but to depict a cruel world we should strive to overcome. Culture and civilization are the major goals in Degenesis, accompanied by hope. We still recommend Degenesis for people 16+ as we cannot be sure whether our message and our appeal to humanity will be understood.
                    </Text>
                </Box>

                <Box mt={40}>
                    <Text size="sm">ISBN 978-3-9819851-1-5</Text>
                    <Text size="xs" mt={8}>
                        Degenesis® is ™ SIXMOREVODKA Studio GmbH. All rights reserved. The mentioning of or reference to companies and products on the following pages constitutes no copyright violation. All names, titles, characters, texts and illustrations in this book are © SIXMOREVODKA Studio GmbH. All rights reserved. No part of this publication may be reproduced, stored in a retrieval system, or transmitted in any form by any means, electronic, mechanical, photocopying, recording or otherwise without the prior express permission of the publishers. Character sheets may be copied for personal use only. Printed in the EU.
                    </Text>
                </Box>
            </Box>
        </Container>
    );
}

export default function Component() {
    return (
        <MantineProvider>
            <ContentsPage />
        </MantineProvider>
    );
}