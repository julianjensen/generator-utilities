import { iterate } from "../base-iterators/index";

/**
 * For dividends generted by `it`, yields the value mod `n` based on Euclidian division.
 * The result is always positive
 *
 * @param  {Iterable}    it An iterable sequence of numbers to be used as the dividend
 * @param  {Number}    n  The divisor
 * @return {Generator}
 */
export default function* modulo(it, n) {
    for (let value of iterate(it)) {
        yield (value % n + Math.abs(n)) % n;
    }
}
