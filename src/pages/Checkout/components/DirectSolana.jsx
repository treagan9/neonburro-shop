// src/pages/Checkout/components/DirectSolana.jsx
// SENTINEL: NB_SHOP_DIRECT_SOLANA_V1
//
// The direct rail at the foot of checkout. Stripe's stablecoin option above
// settles USDC to us in dollars through Stripe. This one skips the processor:
// the customer sends USDC or SOL straight to the studio wallet, Cypher (the
// functions in netlify/functions/_solana.js) watches the chain, and the order
// clears the moment it lands.
//
// ── what the customer gives us ──────────────────────────────────────────────
// Nothing, if they like. Email and address are optional on this rail. The
// copy says plainly what happens without them: digital float goes nowhere
// without an email, physical goods go nowhere without an address, the money
// still lands and the record is on chain either way. That is the deal Tyler
// asked for and it is written into the fields, not hidden in a policy.
//
// ── the two ways to pay ─────────────────────────────────────────────────────
// A QR code and an "open in wallet" link carry a Solana Pay URL with a
// reference key, and a wallet that follows it tags the transfer for us. Below
// that, the address and the exact amount with copy buttons, for people who
// would rather send from Coinbase or type it into Phantom. That path has no
// reference, so the amount carries a tiny random tail and the function scans
// the wallet's recent transactions for a match. Both are verified server side,
// this file only asks "has it landed yet" every few seconds.
//
// ── mounting ────────────────────────────────────────────────────────────────
// Sits OUTSIDE the Stripe Elements providers in Checkout/index.jsx, it has
// nothing to do with Stripe. Calls onPaid with the same formData shape the
// Stripe paths use, plus paymentMethod 'solana' and the signature in place of
// a PaymentIntent id, so finalizeOrder needs no special case.
//
// No oxford commas, no em dashes.

import { useState, useEffect, useRef, useCallback } from 'react';
import { Box, VStack, HStack, Text, Input, Textarea, Image, useClipboard } from '@chakra-ui/react';
import { FiCopy, FiCheck, FiExternalLink, FiRefreshCw } from 'react-icons/fi';
import QRCode from 'qrcode';
import { colors } from '../../../theme/colors';
import { EASE } from '../../../theme/layout';
import { isDigitalItem } from '../../../context/CartContext';

const LIME = colors.accent.signal;
const POLL_MS = 5000;

const kicker = {
  fontFamily: 'mono', fontSize: '10px', fontWeight: '500', letterSpacing: '0.2em', textTransform: 'uppercase',
};

const inputStyles = {
  bg: 'rgba(255,255,255,0.03)', border: '1px solid', borderColor: colors.ui.border, borderRadius: '12px',
  color: colors.text.primary, fontSize: 'sm', h: '46px', px: 4,
  _placeholder: { color: colors.text.muted },
  _hover: { borderColor: 'rgba(255,255,255,0.16)' },
  _focus: { borderColor: LIME, boxShadow: 'none' },
};

const short = (s = '') => (s.length > 14 ? `${s.slice(0, 6)}…${s.slice(-6)}` : s);

const CopyRow = ({ label, value, display }) => {
  const { hasCopied, onCopy } = useClipboard(value);
  return (
    <HStack as="button" type="button" onClick={onCopy} w="100%" justify="space-between" py={3}
      borderBottom="1px solid" borderColor={colors.ui.border} textAlign="left" role="group">
      <VStack align="start" spacing={0} minW={0}>
        <Text {...kicker} color={colors.text.muted}>{label}</Text>
        <Text fontFamily="mono" fontSize="sm" color={colors.text.primary} noOfLines={1} wordBreak="break-all">{display || value}</Text>
      </VStack>
      <HStack spacing={2} color={hasCopied ? LIME : colors.text.muted} flexShrink={0}
        transition={`color 220ms ${EASE}`} _groupHover={{ color: LIME }}>
        <Text {...kicker}>{hasCopied ? 'copied' : 'copy'}</Text>
        {hasCopied ? <FiCheck size={14} /> : <FiCopy size={14} />}
      </HStack>
    </HStack>
  );
};

const Choice = ({ value, current, onPick, children }) => (
  <Box as="button" type="button" onClick={() => onPick(value)} px={4} h="38px" borderRadius="full"
    border="1px solid" borderColor={current === value ? LIME : colors.ui.border}
    bg={current === value ? 'rgba(197,217,87,0.10)' : 'transparent'}
    color={current === value ? LIME : colors.text.secondary} fontFamily="mono" fontSize="11px"
    fontWeight="600" letterSpacing="0.14em" textTransform="uppercase"
    transition={`border-color 220ms ${EASE}, color 220ms ${EASE}, background 220ms ${EASE}`}
    _hover={{ borderColor: LIME, color: colors.text.primary }}>
    {children}
  </Box>
);

const DirectSolana = ({ cart, total, onPaid, onError, disabled }) => {
  const [open, setOpen] = useState(false);
  const [currency, setCurrency] = useState('USDC');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [request, setRequest] = useState(null);
  const [qr, setQr] = useState('');
  const [status, setStatus] = useState('idle');   // idle | opening | waiting | paid | expired | error
  const [secondsLeft, setSecondsLeft] = useState(0);
  const pollRef = useRef(null);
  const doneRef = useRef(false);

  const physical = cart.some((i) => !isDigitalItem(i));
  const digital = cart.some(isDigitalItem);

  const stop = () => { if (pollRef.current) { clearInterval(pollRef.current); pollRef.current = null; } };
  useEffect(() => () => stop(), []);

  const begin = useCallback(async () => {
    setStatus('opening');
    doneRef.current = false;
    try {
      const res = await fetch('/.netlify/functions/solana-pay-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currency,
          customer: { name: name.trim(), email: email.trim(), address: address.trim() },
          items: cart.map((i) => ({
            id: i.id, name: i.name, price: i.price, quantity: i.quantity,
            selectedSize: i.selectedSize || null, selectedDesign: i.selectedDesign || null,
            selectedTier: i.selectedTier || null, reloadCode: i.reloadCode || null,
            delivery: isDigitalItem(i) ? 'digital' : 'ship',
          })),
        }),
      });
      const data = await res.json();
      if (!res.ok || data.error) throw new Error(data.error || 'Could not open the direct payment');
      setRequest(data);
      const png = await QRCode.toDataURL(data.url, {
        margin: 1, width: 480, errorCorrectionLevel: 'M',
        color: { dark: '#0B0B0C', light: '#F4F3F1' },
      });
      setQr(png);
      setStatus('waiting');
    } catch (err) {
      setStatus('error');
      if (onError) onError(err.message);
    }
  }, [cart, currency, name, email, address, onError]);

  // The clock and the poll. Both stop the moment it lands or lapses.
  useEffect(() => {
    if (status !== 'waiting' || !request) return undefined;
    const tick = () => setSecondsLeft(Math.max(0, Math.round((new Date(request.expiresAt).getTime() - Date.now()) / 1000)));
    tick();
    const clock = setInterval(tick, 1000);
    const poll = async () => {
      try {
        const res = await fetch(`/.netlify/functions/solana-pay-status?reference=${encodeURIComponent(request.reference)}`);
        const data = await res.json();
        if (data.status === 'paid' && !doneRef.current) {
          doneRef.current = true;
          stop();
          setStatus('paid');
          const parts = name.trim().split(/\s+/);
          onPaid({
            firstName: parts.shift() || '',
            lastName: parts.join(' '),
            email: email.trim(),
            phone: '',
            address: address.trim(),
            city: '', state: '', zip: '', country: 'United States',
            paymentMethod: 'solana',
            paymentIntentId: data.signature,
            solana: {
              signature: data.signature, payer: data.payer, currency: request.currency,
              amountToken: request.amountToken, address: address.trim() || null,
            },
          });
        } else if (data.status === 'expired') {
          stop();
          setStatus('expired');
        }
      } catch {
        // a missed poll is not a failed payment
      }
    };
    pollRef.current = setInterval(poll, POLL_MS);
    poll();
    return () => { clearInterval(clock); stop(); };
  }, [status, request, name, email, address, onPaid]);

  const reset = () => { stop(); setRequest(null); setQr(''); setStatus('idle'); };

  const mm = String(Math.floor(secondsLeft / 60)).padStart(2, '0');
  const ss = String(secondsLeft % 60).padStart(2, '0');

  return (
    <Box mt={{ base: 10, md: 14 }} pt={{ base: 8, md: 10 }} borderTop="1px solid" borderColor={colors.ui.border}
      opacity={disabled ? 0.5 : 1} pointerEvents={disabled ? 'none' : 'auto'}>
      <HStack spacing={3} mb={3}>
        <Box w="6px" h="6px" borderRadius="full" bg={LIME} boxShadow={`0 0 10px ${LIME}`}
          sx={{ '@keyframes nbSolanaLive': { '0%, 100%': { opacity: 1 }, '50%': { opacity: 0.35 } }, animation: 'nbSolanaLive 3.4s ease-in-out infinite' }} />
        <Text {...kicker} color={LIME}>Direct · Solana · no processor</Text>
      </HStack>
      <Text fontSize={{ base: 'xl', md: '2xl' }} fontWeight="600" letterSpacing="-0.02em" color={colors.text.primary} lineHeight="1.15" mb={2}>
        Or send it straight to the wallet.
      </Text>
      <Text fontSize="sm" color={colors.text.secondary} lineHeight="1.6" maxW="56ch" mb={5}>
        USDC or SOL to the studio's own Solana address. Nothing in between, no account, no card. Cypher watches the chain and clears the order the moment it lands, usually inside a minute. Leave an email if you want float delivered, an address if something ships. Both are yours to skip.
      </Text>

      {!open && (
        <Box as="button" type="button" onClick={() => setOpen(true)} h="46px" px={6} borderRadius="full"
          border="1px solid" borderColor={colors.ui.border} color={colors.text.primary} fontWeight="600" fontSize="sm"
          transition={`border-color 220ms ${EASE}, color 220ms ${EASE}`} _hover={{ borderColor: LIME, color: LIME }}>
          Pay direct on Solana · ${Number(total).toFixed(2)}
        </Box>
      )}

      {open && status !== 'waiting' && status !== 'paid' && (
        <VStack align="stretch" spacing={4} maxW="560px">
          <HStack spacing={2}>
            <Choice value="USDC" current={currency} onPick={setCurrency}>USDC</Choice>
            <Choice value="SOL" current={currency} onPick={setCurrency}>SOL</Choice>
            <Text {...kicker} color={colors.text.muted} pl={2}>{currency === 'USDC' ? 'a dollar is a dollar' : 'priced when you open it'}</Text>
          </HStack>
          <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name, optional" autoComplete="name" {...inputStyles} />
          <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" autoComplete="email"
            placeholder={digital ? 'Email, optional. Without it no float can be sent.' : 'Email, optional. For a receipt.'} {...inputStyles} />
          {physical && (
            <Textarea value={address} onChange={(e) => setAddress(e.target.value)} rows={2}
              placeholder="Ship to, optional. Without it nothing physical can leave Ridgway." {...inputStyles} h="auto" py={3} resize="none" />
          )}
          <HStack spacing={3} pt={1}>
            <Box as="button" type="button" onClick={begin} disabled={status === 'opening'} h="48px" px={7} borderRadius="full"
              bg={LIME} color={colors.dark.black} fontWeight="700" fontSize="sm"
              transition={`transform 220ms ${EASE}, filter 220ms ${EASE}`} _hover={{ transform: 'translateY(-2px)', filter: 'brightness(1.06)' }}
              opacity={status === 'opening' ? 0.7 : 1}>
              {status === 'opening' ? 'Opening' : `Show me where to send ${currency}`}
            </Box>
            <Box as="button" type="button" onClick={() => setOpen(false)} color={colors.text.muted} fontSize="sm" fontWeight="500"
              _hover={{ color: colors.text.primary }}>Not now</Box>
          </HStack>
          {status === 'expired' && (
            <Text fontSize="sm" color={colors.accent.warm}>That request lapsed with nothing found. Nothing was taken. Open a fresh one.</Text>
          )}
        </VStack>
      )}

      {open && (status === 'waiting' || status === 'paid') && request && (
        <Box>
          <HStack align="start" spacing={{ base: 5, md: 8 }} flexDir={{ base: 'column', md: 'row' }}>
            <Box w={{ base: '100%', md: '240px' }} maxW="240px" flexShrink={0} borderRadius="12px" overflow="hidden" bg="#F4F3F1" p="6px">
              {qr && <Image src={qr} alt={`Solana Pay QR for ${request.amountToken} ${request.currency}`} w="100%" h="auto" draggable={false} />}
            </Box>
            <VStack align="stretch" spacing={0} flex={1} minW={0} w="100%">
              <HStack justify="space-between" align="baseline" pb={3} borderBottom="1px solid" borderColor={colors.ui.border}>
                <VStack align="start" spacing={0}>
                  <Text {...kicker} color={colors.text.muted}>send exactly</Text>
                  <Text fontFamily="mono" fontSize={{ base: '2xl', md: '3xl' }} fontWeight="600" color={LIME} letterSpacing="-0.01em">
                    {request.amountToken} <Text as="span" fontSize="md" color={colors.text.secondary}>{request.currency}</Text>
                  </Text>
                </VStack>
                <VStack align="end" spacing={0}>
                  <Text {...kicker} color={colors.text.muted}>for</Text>
                  <Text fontFamily="mono" fontSize="md" color={colors.text.primary}>${Number(request.amountUsd).toFixed(2)}</Text>
                </VStack>
              </HStack>
              <CopyRow label="to this address" value={request.recipient} display={short(request.recipient)} />
              <CopyRow label="amount" value={String(request.amountToken)} />
              {request.currency === 'SOL' && (
                <Text {...kicker} color={colors.text.muted} pt={3}>priced at ${Number(request.priceUsd).toFixed(2)} per SOL, held for the timer</Text>
              )}
              <HStack spacing={3} pt={4} flexWrap="wrap">
                <Box as="a" href={request.url} display="inline-flex" alignItems="center" gap="8px" h="44px" px={5} borderRadius="full"
                  bg={LIME} color={colors.dark.black} fontWeight="700" fontSize="sm"
                  transition={`transform 220ms ${EASE}, filter 220ms ${EASE}`} _hover={{ transform: 'translateY(-2px)', filter: 'brightness(1.06)' }}>
                  Open in wallet <FiExternalLink size={14} />
                </Box>
                <Text fontSize="xs" color={colors.text.muted} maxW="30ch" lineHeight="1.5">
                  On a phone that opens Phantom, Solflare or Jupiter. On a laptop, scan the code with the wallet app.
                </Text>
              </HStack>
            </VStack>
          </HStack>

          <HStack spacing={3} mt={6} pt={4} borderTop="1px solid" borderColor={colors.ui.border} justify="space-between" flexWrap="wrap" rowGap={3}>
            <HStack spacing={3}>
              <Box w="6px" h="6px" borderRadius="full" bg={status === 'paid' ? LIME : colors.text.muted}
                boxShadow={status === 'paid' ? `0 0 10px ${LIME}` : 'none'}
                sx={status === 'waiting' ? { '@keyframes nbSolanaWait': { '0%, 100%': { opacity: 1 }, '50%': { opacity: 0.3 } }, animation: 'nbSolanaWait 2s ease-in-out infinite' } : undefined} />
              <Text {...kicker} color={status === 'paid' ? LIME : colors.text.secondary}>
                {status === 'paid' ? 'Landed. Cypher saw it.' : 'Waiting for the transfer · Cypher is watching the chain'}
              </Text>
            </HStack>
            {status === 'waiting' && (
              <HStack spacing={4}>
                <Text fontFamily="mono" fontSize="11px" color={secondsLeft < 120 ? colors.accent.warm : colors.text.muted} letterSpacing="0.06em">
                  {mm}:{ss}
                </Text>
                <HStack as="button" type="button" onClick={reset} spacing={2} color={colors.text.muted} _hover={{ color: colors.text.primary }}>
                  <FiRefreshCw size={12} />
                  <Text {...kicker}>start over</Text>
                </HStack>
              </HStack>
            )}
          </HStack>
        </Box>
      )}
    </Box>
  );
};

export default DirectSolana;
