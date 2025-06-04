<?php

class JWT {
  private static string $typ = 'JWT';

  private static string $alg = 'HS256';

  public static function encode(
    array $payload,
    string $secret,
    ?int $expire = 3600
  ): string {
    $header = json_encode([
      'typ' => self::$typ,
      'alg' => self::$alg
    ]);

    $payload['iat'] = time();
    $payload['exp'] = time() + $expire;
    $payload = json_encode($payload);

    $header_b64 = self::B64Encode($header);
    $payload_b64 = self::B64Encode($payload);

    $to_sign = implode('.', [$header_b64, $payload_b64]);
    $sign = hash_hmac('sha256', $to_sign, $secret, true);
    $sign_b64 = self::B64Encode($sign);

    return implode('.', [$header_b64, $payload_b64, $sign_b64]);
  }

  public static function decode(
    string $jwt,
    string $secret
  ): array {
    $parts = explode('.', $jwt);

    if (count($parts) !== 3) {
      $msg = "JWT token format not valid, expected exactly 3 segments.";
      throw new InvalidArgumentException($msg);
    }

    [$header_b64, $payload_b64, $sign_b64] = $parts;

    $header  = json_decode(self::B64Decode($header_b64), true);
    $payload = json_decode(self::B64Decode($payload_b64), true);

    if (is_null($header) || is_null($payload) || json_last_error() !== JSON_ERROR_NONE) {
      throw new InvalidArgumentException('Invalid header or payload');
    }

    if (!isset($header['alg']) || !isset($header['typ'])) {
      throw new InvalidArgumentException('Header is missing required fields (typ, alg)');
    }

    if ($header['typ'] !== self::$typ) {
      throw new InvalidArgumentException('Invalid token type');
    }

    if ($header['alg'] !== self::$alg) {
      throw new InvalidArgumentException('Algorithm invalid or not supported');
    }

    $sign    = self::B64Decode($sign_b64);

    $to_resign = implode('.', [$header_b64, $payload_b64]);
    $expected_sign = hash_hmac('sha256', $to_resign, $secret, true);

    if (!hash_equals($sign, $expected_sign)) {
      $msg = "Signature verification failed";
      throw new Exception($msg);
    }

    $exp = $payload['exp'];

    if (isset($exp) && is_numeric($exp)) {
      if (time() >= $exp) {
        $msg = "JWT token expired";
        throw new Exception($msg);
      }
    }

    return $payload;
  }

  private static function B64Encode(string $data): string {
    return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
  }

  private static function B64Decode(string $data): string {
    if ($mod = strlen($data) % 4) {
      $data .= str_repeat('=', 4 - $mod);
    }

    return base64_decode(strtr($data, '-_', '+/'));
  }
}
