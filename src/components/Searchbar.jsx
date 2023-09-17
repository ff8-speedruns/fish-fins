import { Input, Group } from '@mantine/core';
import { IconFish } from '@tabler/icons-react';
import PropTypes from 'prop-types';

export default function Searchbar(props) {
    function handleChange(event) {
        let newSearchText = event.target.value;
        //this.setState({ searchText: newSearchText });
        if (props.onChange) props.onChange(newSearchText);
    }

    return (
        <Group grow>
            <Input
                icon={<IconFish />}
                placeholder="Pattern"
                radius="xl"
                size="lg"
                onChange={handleChange}
            />
        </Group>
    );
}

Searchbar.propTypes = {
    onChange: PropTypes.func
}