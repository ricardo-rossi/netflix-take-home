/* eslint-disable no-undef */

import Model from './Model';
import {describe} from '@jest/globals';

describe('Model', () => {

    const key = 'my-key';

    test('should get null when key doesn\'t exist', () => {
        const data = Model._get('something-that-does-not-exist');
        expect(data).toBeNull();
    });

    test('should save and get correct values', () => {
        Model._save(key, 'my-value');
        const data = Model._get(key);
        expect(data).toEqual('my-value');
        Model._remove(key);
    });

    test('should verify key was removed correctly', () => {
        Model._save(key, 'my-value');
        Model._remove(key);
        const data = Model._get(key);
        expect(data).toBeNull()
    });

});
