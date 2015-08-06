# tilestrata-proxy

A [TileStrata](https://github.com/naturalatlas/tilestrata) plugin for proxing tile requests.

### Sample Usage

```js
var tilestrata = require('tilestrata');
var vtileraster = require('tilestrata-vtile-raster');
var proxy = require('tilestrata-proxy');
var strata = tilestrata.createServer();

var options = {
    xml: '/home/ybon/Code/maps/thankyou/mapnik.xml',
    tileSize: 256,
    metatile: 1,
    bufferSize: 128,
    tilesource: ['vtiles', 't.pbf']
};

strata.layer('vtiles').route('t.pbf').use(proxy({url: 'http://domain.com/{z}/{x}/{y}.mvt'}))
      .layer('mylayer').route('t.png').use(vtileraster(options));

strata.listen(8080);
```

## License

Copyright &copy; 2015 [Natural Atlas, Inc.](https://github.com/naturalatlas) & [Contributors](https://github.com/naturalatlas/tilestrata-vtile-raster/graphs/contributors)

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at: http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
