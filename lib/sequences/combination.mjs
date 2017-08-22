import { take } from "../chainables/index";
import counter from "./counter";

/**
 * Generate unique combinations of values from a given set of values. The number of values in the set must be
 * finite.
 *
 * @generator
 * @param {ArrayLike|Iterable} set The set of values from which to generate the unique combinations.
 * @param size The number of items to include in each combination
 * @yields Arrays containing unique combinations of values from the set of the specified size
 */
export default function* combination(set, size) {
    let src = Array.isArray(set) ? set : Array.from(set);

    // Clamp value between 1 and the length of the source array.
    // Default to the source length if size is outside that range.
    let n = Math.min(Math.max(+size, 0) || src.length, src.length);
    let m = n - 1;

    let seq = [...take(counter(), n)]; // Sequence

    const maxValueAt = index => src.length - seq.length + index;

    let i = m;
    while (i >= 0) {
        while (i < m) {
            i++;
            seq[i] = seq[i - 1] + 1;
        }

        while (seq[i] < src.length) {
            yield seq.map(v => src[v]);
            seq[i]++;
        }

        while (--i >= 0 && seq[i] > maxValueAt(i));

        if (i >= 0) seq[i]++;
    }
}
