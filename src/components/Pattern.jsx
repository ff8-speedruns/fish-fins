import { Table } from '@mantine/core';
import PropTypes from 'prop-types';

export default function Pattern(props) {
    let searchPattern = props.pattern;
    const data = props.data;

    // Remove all whitespace
    searchPattern = searchPattern.trim();
    searchPattern = searchPattern.replace(/ /g, '');

    // Do the filter
    const elements = data.filter(element => element.pattern.toLowerCase().replace(/ /g, '').startsWith(searchPattern.toLowerCase()));

    const rows = elements.map((element) => {
        let notes = [];

        for (const note in element.notes) {
            notes.push(<div key={note}>{note + ": " + element.notes[note]}</div>)
        }

        return (
            <tr key={element.index}>
                <td>{element.index}</td>
                <td>{element.pattern}</td>
                <td>{element.atbRefresh}</td>
                <td>{element.drop}</td>
                <td>{notes}</td>
            </tr>);
    });

    return (
        <Table>
            <thead>
                <tr>
                    <th>Index</th>
                    <th>Pattern</th>
                    <th>ATB</th>
                    <th>Drop</th>
                    <th>Notes</th>
                </tr>
            </thead>
            <tbody>{rows}</tbody>
        </Table>
    );
}

Pattern.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
    pattern: PropTypes.string
}