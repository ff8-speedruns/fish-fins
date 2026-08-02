import { TextInput } from '@mantine/core';
import { IconFish } from '@tabler/icons-react';
import PropTypes from 'prop-types';

export default function Searchbar({ onChange }) {
    return (
        <TextInput
            leftSection={<IconFish />}
            placeholder="Pattern"
            radius="xl"
            size="lg"
            aria-label="Search fin patterns"
            onChange={(event) => onChange?.(event.currentTarget.value)}
        />
    );
}

Searchbar.propTypes = {
    onChange: PropTypes.func
};
