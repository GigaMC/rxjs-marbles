/**
 * @license Copyright © 2017 Nicholas Jamieson. All Rights Reserved.
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/cartant/rxjs-marbles
 */

import * as tape from "tape";
import { Context, marbles } from "../../dist";

import "rxjs/add/operator/map";

tape("rxjs-marbles failing test", marbles<tape.Test>((m, t) => {

    m.configure({
        assert: t.ok.bind(t),
        assertDeepEqual: t.deepEqual.bind(t)
    });

    const values = {
        a: 1,
        b: 2,
        c: 3,
        d: 4
    };

    const source =  m.hot("--^-a-b-c-|", values);
    const subs =            "^-------!";
    const expected = m.cold("--b-c-d-|", values);

    const destination = source.map((value: number) => value + 1);

    t.plan(1);
    m.expect(destination).toBeObservable(source);
}));
