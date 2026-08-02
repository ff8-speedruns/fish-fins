import { memo, useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { Box, Text } from '@mantine/core';
import PropTypes from 'prop-types';

// Shared between the header and every row so columns always line up.
const COLUMNS = [
    { key: 'index', label: 'Index', flex: '0 0 4.5rem' },
    { key: 'pattern', label: 'Pattern', flex: '0 0 10rem' },
    { key: 'atbRefresh', label: 'ATB', flex: '0 0 4.5rem' },
    { key: 'drop', label: 'Drop', flex: '0 0 4.5rem' },
    { key: 'notes', label: 'Notes', flex: '1 1 auto' },
];

const PatternRow = memo(function PatternRow({ element, index, start, measureElement }) {
    return (
        <div
            ref={measureElement}
            data-index={index}
            role="row"
            className="ff8-vtable-row"
            style={{ transform: `translateY(${start}px)` }}
        >
            <div role="cell" className="ff8-vtable-cell" style={{ flex: COLUMNS[0].flex }}>
                {element.index}
            </div>
            <div role="cell" className="ff8-vtable-cell" style={{ flex: COLUMNS[1].flex }}>
                {element.pattern}
            </div>
            <div role="cell" className="ff8-vtable-cell" style={{ flex: COLUMNS[2].flex }}>
                {element.atbRefresh}
            </div>
            <div role="cell" className="ff8-vtable-cell" style={{ flex: COLUMNS[3].flex }}>
                {element.drop}
            </div>
            <div role="cell" className="ff8-vtable-cell" style={{ flex: COLUMNS[4].flex }}>
                {Object.entries(element.notes ?? {}).map(([note, value]) => (
                    <div key={note}>{`${note}: ${value}`}</div>
                ))}
            </div>
        </div>
    );
});

PatternRow.propTypes = {
    element: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    start: PropTypes.number.isRequired,
    measureElement: PropTypes.func.isRequired,
};

export default function Pattern({ data, pattern }) {
    const searchPattern = pattern.replace(/\s/g, '').toLowerCase();

    const elements = data.filter((element) =>
        element.pattern.replace(/\s/g, '').toLowerCase().startsWith(searchPattern)
    );

    const scrollRef = useRef(null);

    // Rows vary in height (a fin can have 0-2 note lines), so we estimate a
    // single-line height up front and let the virtualizer measure the real
    // rendered height per row and adjust — the standard approach for
    // variable-content virtualized lists.
    //
    // TanStack Virtual intentionally returns fresh handler functions every
    // render; that's documented library behavior, not a stale-closure bug.
    // eslint-disable-next-line react-hooks/incompatible-library
    const virtualizer = useVirtualizer({
        count: elements.length,
        getScrollElement: () => scrollRef.current,
        estimateSize: () => 44,
        overscan: 8,
        getItemKey: (index) => elements[index].index,
    });

    return (
        <>
            <Box className="ff8-vtable" role="table" aria-label="Fish fin patterns" mt="md">
                <div className="ff8-vtable-head" role="row">
                    {COLUMNS.map((column) => (
                        <div
                            key={column.key}
                            role="columnheader"
                            className="ff8-vtable-cell"
                            style={{ flex: column.flex }}
                        >
                            {column.label}
                        </div>
                    ))}
                </div>

                <div ref={scrollRef} className="ff8-vtable-scroll" style={{ height: 480 }}>
                    <div
                        role="rowgroup"
                        className="ff8-vtable-body"
                        style={{ height: virtualizer.getTotalSize() }}
                    >
                        {virtualizer.getVirtualItems().map((virtualRow) => (
                            <PatternRow
                                key={virtualRow.key}
                                element={elements[virtualRow.index]}
                                index={virtualRow.index}
                                start={virtualRow.start}
                                measureElement={virtualizer.measureElement}
                            />
                        ))}
                    </div>
                </div>
            </Box>
            {elements.length === 0 && (
                <Text c="dimmed" ta="center" py="lg">
                    No pattern matches “{pattern}”.
                </Text>
            )}
        </>
    );
}

Pattern.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
    pattern: PropTypes.string
};
