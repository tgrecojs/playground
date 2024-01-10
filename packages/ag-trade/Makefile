STATE=$(shell endo where state)
PET=$(STATE)/pet-store

where:
	@echo state: $(STATE)

node-info: $(PET)/local
	endo eval "E(local.lcd).getJSON('/node_info').then(i => i.node_info)" local

$(PET)/local: src/net-local.js $(PET)/cosmos-fetch
	endo make src/net-local.js -n local -p cosmos-fetch

$(PET)/cosmos-fetch: src/cosmosFetch.js
	@echo ++ install cosmos fetch plugin
	endo make --UNSAFE src/cosmosFetch.js -n cosmos-fetch

clean:
	endo reset
