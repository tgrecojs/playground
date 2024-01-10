STATE=$(shell endo where state)
PET=$(STATE)/pet-store

where:
	@echo state: $(STATE)

reserve-add: src/reserve-add.js $(PET)/alice
	endo run src/reserve-add.js 1 IST -p alice

$(PET)/alice: $(PET)/alice-wk $(PET)/fresh-trade-id
	endo mkguest alice

	endo send alice @wallet:alice-wk
	endo send alice @fresh:fresh-trade-id
	endo inbox --as alice
	# these 0/1 message numbers are fragile
	endo adopt 0 wallet --as alice
	endo adopt 1 fresh --as alice

$(PET)/fresh-trade-id: $(PET)/fresh
	endo eval "E(fresh).start('trade-')" fresh -n fresh-trade-id

# making fresh IDs requires non-deterministic inputs
$(PET)/fresh: src/fresh-id.js
	endo make --UNSAFE src/fresh-id.js -n fresh

# in makeWalletKit, it's too easy to get the rpc, lcd order wrong. should be named
$(PET)/alice-wk: $(PET)/local $(PET)/client-maker
	endo eval "E(wf).makeWalletKit('${ALICE_SECRET}', local.rpc, local.lcd)" \
		local wf:client-maker -n alice-wk

client-maker: $(PET)/client-maker

$(PET)/client-maker: src/smartWallet.js
	@echo ++ start smart wallet caplet -- TODO: should not need UNSAFE
	endo make --UNSAFE src/smartWallet.js -n client-maker

node-info: $(PET)/local
	endo eval "E(local.lcd).getJSON('/node_info').then(i => i.node_info)" local

$(PET)/local: src/net-local.js $(PET)/cosmos-fetch
	endo make src/net-local.js -n local -p cosmos-fetch

$(PET)/cosmos-fetch: src/cosmosFetch.js
	@echo ++ install cosmos fetch plugin
	endo make --UNSAFE src/cosmosFetch.js -n cosmos-fetch

clean:
	endo reset
