import Length from '@ui/LengthPole';
import { Suspense } from 'react'
/**
 * The main page component that renders the HomePage component.
 *
 * @returns {JSX.Element} The rendered HomePage component.
 */
const Page = () => {


    return (<Suspense>
        <Length />
    </Suspense>);
};

export default Page;
